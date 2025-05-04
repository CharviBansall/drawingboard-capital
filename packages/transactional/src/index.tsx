import { Webhook } from 'standardwebhooks';
import { Resend } from 'resend';
import OTPLoginTemplate from './emails/OTPLoginTemplate';
interface Env {
	RESEND_TRANSACTIONAL_API_KEY: string;
	SEND_EMAIL_HOOK_SECRET: string;
}

export default {
	async fetch(request, env, context): Promise<Response> {
		const hookSecret = env.SEND_EMAIL_HOOK_SECRET.replace('v1,whsec_', '');
		const payload = await request.text();
		const headers = Object.fromEntries(request.headers);
		const wh = new Webhook(hookSecret);
		const { email_data, user } = wh.verify(payload, headers) as {
			user: {
				email: string;
				user_metadata: {
					username: string;
					lang: string;
				};
			};
			email_data: {
				token: string;
				token_hash: string;
				redirect_to: string;
				email_action_type: string;
				site_url: string;
				token_new: string;
				token_hash_new: string;
			};
		};
		const url = new URL(`${email_data.site_url}/verify`);

		url.searchParams.append('token', email_data.token_hash);
		url.searchParams.append('type', email_data.email_action_type);
		url.searchParams.append('redirect_to', email_data.redirect_to);

		console.log('event:', user, email_data);
		console.log('url:', url.toString());
		const resend = new Resend(env.RESEND_TRANSACTIONAL_API_KEY);
		if (email_data.email_action_type === 'magiclink') {
			const response = await resend.emails.send({
				from: 'DrawingBoard <team@transactional.drawingboard.capital>',
				to: user.email,
				subject: 'Your login code for DrawingBoard',
				react: OTPLoginTemplate({
					validationCode: email_data.token,
					link: url.toString(),
				}),
			});
			console.log(response);
			return Response.json({});
		} else return Response.json({});
	},
} satisfies ExportedHandler<Env, ExecutionContext>;
