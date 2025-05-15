import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from '@react-email/components';

interface OTPLoginTemplateProps {
	validationCode?: string;
	link?: string;
}

export const OTPLoginTemplate = ({
	validationCode,
	link,
}: OTPLoginTemplateProps) => (
	<Html>
		<Head />
		<Body style={main}>
			<Preview>Use this code to finish signing in to your DrawingBoard account. This code is valid for one hour.</Preview>
			<Container style={container}>
				<Img
					src={`https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/brand-assets/png/BlueLogoNoWordmark.png`}
					alt="DrawingBoard Logo"
					style={logo}
				/>
				<Heading style={heading}>Your login code for DrawingBoard</Heading>
				<Section style={buttonContainer}>
					<Button style={button} target="_blank" href={link}>
						Login to DrawingBoard
					</Button>
				</Section>
				<Text style={paragraph}>
					This link and code will only be valid for the next hour, but you can
					always get a new one by signing in again.
				</Text>
				<Text style={paragraph}>
					If the link doesn&apos;t work, you can use the login verification code
					directly:
				</Text>
				<code style={code}>{validationCode}</code>
				<Text>
					Having trouble logging in? Reply to this email or contact us at{' '}
					<Link href="mailto:support@drawingboard.capital">
						support@drawingboard.capital
					</Link>
					.
				</Text>
				<Hr style={hr} />
				<Link href="https://drawingboard.capital" style={reportLink}>
					DrawingBoard Capital LLC | 8 The Green Suite Suite A, Dover, DE 19901,
					USA
				</Link>
			</Container>
		</Body>
	</Html>
);

OTPLoginTemplate.PreviewProps = {
	validationCode: '343946',
} as OTPLoginTemplateProps;

export default OTPLoginTemplate;

const logo: React.CSSProperties = {
	borderRadius: 21,
	aspectRatio: 1,
	width: 'auto',
	maxWidth: '42px',
	height: 'auto',
	objectFit: 'contain',
};

const main = {
	backgroundColor: '#ffffff',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: '0 auto',
	padding: '20px 0 48px',
	maxWidth: '560px',
};

const heading = {
	fontSize: '24px',
	letterSpacing: '-0.5px',
	lineHeight: '1.3',
	fontWeight: '400',
	color: '#484848',
	padding: '17px 0 0',
};

const paragraph = {
	margin: '0 0 15px',
	fontSize: '15px',
	lineHeight: '1.4',
	color: '#3c4149',
};

const buttonContainer = {
	padding: '27px 0 27px',
};

const button = {
	backgroundColor: '#011A2B',
	borderRadius: '3px',
	fontWeight: '600',
	color: '#fff',
	fontSize: '15px',
	textDecoration: 'none',
	textAlign: 'center' as const,
	display: 'block',
	padding: '11px 23px',
};

const reportLink = {
	fontSize: '14px',
	color: '#b4becc',
};

const hr = {
	borderColor: '#dfe1e4',
	margin: '12px 0 26px',
};

const code = {
	fontFamily: 'monospace',
	fontWeight: '700',
	padding: '1px 4px',
	backgroundColor: '#dfe1e4',
	letterSpacing: '-0.3px',
	fontSize: '21px',
	borderRadius: '4px',
	color: '#3c4149',
};
