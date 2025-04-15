import { Container, Typography, Button } from "@mui/material";

const Hero = () => {
	return (
		<main className="flex items-center justify-center px-4">
			<Container maxWidth="md" className="text-center space-y-4">
				<Typography
					variant="h3"
					component="h1"
					gutterBottom
					className="!font-bold !text-4xl mb-4 text-primary"
				>
					Welcome to Football Predictor
				</Typography>
				<Typography variant="h6" className="text-gray-700">
					Choose your favorite football league and predict the outcomes of
					matches.
				</Typography>
				<Button
					variant="contained"
					color="primary"
					size="large"
					className="!rounded-2xl !bg-accent-orange hover:!bg-accent-red !text-white !px-6 !py-3 !text-lg shadow-md"
				>
					Get Started
				</Button>
			</Container>
		</main>
	);
};

export default Hero;
