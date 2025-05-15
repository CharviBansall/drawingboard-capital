/**
 * Webhook handler for sending transactional emails using Resend.
 *
 * This handler is designed to be deployed as a serverless function (e.g., Cloudflare Workers).
 * It listens for webhook events containing user and email data, verifies the webhook signature,
 * and sends a magic link login email using the Resend API.
 *
 * ## Environment Variables
 * - RESEND_TRANSACTIONAL_API_KEY: API key for Resend transactional email service.
 * - SEND_EMAIL_HOOK_SECRET: Secret for verifying incoming webhook requests.
 *
 * ## Main Flow
 * 1. Receives a webhook request with user and email data.
 * 2. Verifies the webhook using the provided secret.
 * 3. Constructs a verification URL with query parameters.
 * 4. Sends a magic link login email if the action type is 'magiclink'.
 * 5. Returns a JSON response.
 *
 * @module transactional/src/index
 */

import { Webhook } from 'standardwebhooks';
import { Resend } from 'resend';
import OTPLoginTemplate from './emails/OTPLoginTemplate';
import { randomUUID } from 'crypto';
/**
 * Environment variables required by the handler.
 * @typedef {Object} Env
 * @property {string} RESEND_TRANSACTIONAL_API_KEY - API key for Resend
 * @property {string} SEND_EMAIL_HOOK_SECRET - Webhook secret for verifying requests
 */
interface Env {
	RESEND_TRANSACTIONAL_API_KEY: string;
	SEND_EMAIL_HOOK_SECRET: string;
}

/**
 * Main webhook handler entry point.
 * @param {Request} request - Incoming HTTP request
 * @param {Env} env - Environment variables
 * @param {ExecutionContext} context - Worker execution context
 * @returns {Promise<Response>} JSON response
 */
export default {
	async fetch(request, env, context): Promise<Response> {
		// Remove the prefix from the webhook secret for verification
		const hookSecret = env.SEND_EMAIL_HOOK_SECRET.replace('v1,whsec_', '');
		// Read the raw request payload
		const payload = await request.text();
		// Convert headers to a plain object
		const headers = Object.fromEntries(request.headers);
		// Initialize webhook verification
		const wh = new Webhook(hookSecret);
		// Verify the webhook and extract user/email data
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
		// Build the verification URL with query parameters
		const url = new URL(`${email_data.site_url}/verify`);
		url.searchParams.append('token', email_data.token_hash);
		url.searchParams.append('type', email_data.email_action_type);
		url.searchParams.append('redirect_to', email_data.redirect_to);

		// Log event details for debugging
		console.log('event:', user, email_data);
		console.log('url:', url.toString());
		// Initialize Resend client for transactional emails
		const resend = new Resend(env.RESEND_TRANSACTIONAL_API_KEY);
		const id = randomUUID();
		// Only send email if the action type is 'magiclink'
		if (email_data.email_action_type === 'magiclink') {
			// Send the magic link login email using Resend
			const response = await resend.emails.send(
				{
					from: 'DrawingBoard <team@transactional.drawingboard.capital>',
					to: user.email,
					replyTo: 'support@drawingboard.capital',
					subject: 'Your login code for DrawingBoard',
					react: OTPLoginTemplate({
						validationCode: email_data.token,
						link: url.toString(),
					}),
					headers: {
						'X-Entity-Ref-ID': id,
					},
				},
				{ idempotencyKey: id },
			);
			console.log(response);
			return Response.json({});
		} else {
			// For other action types, do nothing and return an empty response
			return Response.json({});
		}
	},
} satisfies ExportedHandler<Env, ExecutionContext>;
