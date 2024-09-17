const constants = require('./../../constants').constants;
const faker = require('../../../../node_modules/faker-br');
import integration from '../../../support/pages/integration';
import prep_env from '../prepareEnvironment';
import 'cypress-wait-until';

class Auth {
	backgroundLogin(user_login, password) {
		cy.request({
			method: 'POST',
			url: '/login',
			body: {
				username: user_login,
				password: password,
				token: faker.random.uuid(),
				remember: 'on',
			},
			failOnStatusCode: false,
			headers: {
				Authorization: Cypress.env('basic_auth'),
				'Content-Type': 'application/json;charset=UTF-8',
				Accept: 'application/json',
			},
		});
	}

	#cognitoUILogin(user, password) {
		cy.get('#signInFormUsername').type(user, { force: true });
		cy.get('#signInFormPassword').type(password, { force: true });
		cy.get('.panel-left-border > :nth-child(2) > :nth-child(1) > .cognito-asf > .btn').click({ force: true });
	}

	interfaceAuth(user = Cypress.env('login_user'), password = Cypress.env('login_password')) {
		cy.session('interface_auth', () => {
			cy.visit('/').then(() => {
				this.#cognitoUILogin(Cypress.env('cognito_user'), Cypress.env('cognito_password'));
			});
			cy.waitUntil(() => cy.url().then((url) => url.includes(Cypress.env('baseUrl'))));
			this.backgroundLogin(user, password);
			cy.setCookie('__hs_opt_out', 'no');
			prep_env.setCookies();
		});
	}

	cognitoAuth() {
		cy.session('cognito_auth', () => {
			cy.visit('/').then(() => {
				this.#cognitoUILogin(Cypress.env('cognito_user'), Cypress.env('cognito_password'));
			});
			cy.waitUntil(() => cy.url().then((url) => url.includes(Cypress.env('baseUrl'))));
			cy.setCookie('__hs_opt_out', 'no');
			prep_env.setCookies();
		});
	}
	apiAuth(user = Cypress.env('login_user'), password = Cypress.env('login_password')) {
		cy.session('api_auth', () => {
			this.backgroundLogin(user, password);
		});
	}

	featureTesterStub() {
		cy.intercept('GET', 'api/v2/feature-tester/*/*').as('feature_tester');
	}

	userData() {
		let phoneMobile = faker.phone.phoneNumberFormat();
		let password = 'minhaSenhaForte';
		return {
			phone_mobile: [phoneMobile.slice(0, 5), '9', phoneMobile.slice(5)].join(''),
			firstname: faker.name.firstName() + 'Test',
			lastname: faker.name.lastName(),
			company: faker.company.companyName(),
			email: faker.internet.email().toLowerCase(),
			document: faker.br.cpf(),
			birthdate: '2015-01-01',
			phone_fixed: faker.phone.phoneNumberFormat(),
			password: password,
			recaptcha_token: faker.random.uuid(),
			password_confirmation: password,
			terms: true,
		};
	}

	createAndGetIdUser(qty) {
		let list_user_id = [];
		let body;
		for (let i = 0; i < qty; i++) {
			body = this.userData();
			cy.CreateUser(body).then((resp) => {
				cy.GetAppConfigUser(`Bearer ${resp.body.token}`, '').then((response) => {
					list_user_id.push(response.body.data.user.id);
				});
			});
		}
		return list_user_id;
	}
	async createAndGetUserData(qty) {
		let list_user_id = [];
		let body;
		for (let i = 0; i < qty; i++) {
			body = this.userData();
			cy.CreateUser(body).then((resp) => {
				cy.GetAppConfigUser(`Bearer ${resp.body.token}`, '').then((response) => {
					body['id'] = response.body.data.user.id;
					body['token'] = resp.body.token;
					list_user_id.push(body);
				});
			});
		}
		return list_user_id;
	}

	addressData() {
		return {
			label: 'Melhor Home',
			postal_code: faker.address.zipCodeValid(),
			address: faker.address.streetName(),
			number: `${Math.floor(Math.random() * 900)}`,
			complement: faker.address.streetSuffix(),
			district: faker.address.cityPrefix(),
			city: faker.address.city(),
			state: faker.address.state(),
			country: 'BR',
		};
	}

	setUserAddress(user) {
		const data = this.addressData();
		cy.SetUserAddress(`Bearer ${user.token}`, data);
	}

	setUserQuiz(user) {
		const data = {
			why_do_you_not_sell: 'Quero indicar o Melhor Envio',
		};
		cy.SetUserQuiz(`Bearer ${user.token}`, data);
	}

	createUserAndSetToken(nameTokenEnv) {
		const body = this.userData();
		cy.CreateUser(body).then((resp) => {
			Cypress.env(nameTokenEnv, `Bearer ${resp.body.token}`);
		});
	}

	setBearerToken(nameTokenEnv, tokenPrivate) {
		cy.request({
			method: 'GET',
			url: '/direction/v1/private-api/qa/get-token',
			headers: {
				'private-api-token': tokenPrivate,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}).then((resp) => {
			Cypress.env(nameTokenEnv, `Bearer ${resp.body.accessToken}`);
		});
	}

	verifyAndSetBearerToken() {
		if (Cypress.env('token') == '') {
			if (Cypress.env('login_user') == 'qa@melhorenvio.com') {
				this.setBearerToken('token', Cypress.env('me_private_api_token'));
			} else {
				prep_env.generateToken('token');
			}
		}
	}

	generatePassword(length) {
		const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
		let password = '';
		let lastChar = '';

		while (password.length < length) {
			const char = charset[Math.floor(Math.random() * charset.length)];

			if (lastChar && Math.abs(lastChar.charCodeAt(0) - char.charCodeAt(0)) === 1) {
				continue;
			}

			password += char;
			lastChar = char;
		}

		return password;
	}
	generateTokenApp() {
		integration.createApp();
		cy.get('@appCredentials').then(({ client, secret }) => {
			this.cognitoAuth();
			cy.visit(
				`${Cypress.env(
					'baseUrl'
				)}/oauth/authorize?response_type=code&client_id=${client}&scope=cart-read%20cart-write&redirect_uri=https%3A%2F%2Foauth.pstmn.io%2Fv1%2Fcallback`
			);
			integration.generateCodeOauth();
			cy.get('@codeApp').then(({ code }) => {
				const codeApp = code;
				let requestBody = {
					grant_type: 'authorization_code',
					code: codeApp,
					client_id: client,
					client_secret: secret,
					redirect_uri: 'https://oauth.pstmn.io/v1/callback',
				};
				cy.generateTokenApp(requestBody).then((response) => {
					const access_token = `Bearer ${response.body.access_token}`;
					Cypress.env('token_app_generated', access_token);
				});
				Cypress.env('idapp', client);
			});
		});
	}
}
export default new Auth();
