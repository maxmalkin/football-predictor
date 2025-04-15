import { Container, Typography, Button } from "@mui/material";

const Hero = () => {
	return (
		<main className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 px-4">
			<Container maxWidth="md" className="text-center">
				<Typography
					variant="h3"
					component="h1"
					gutterBottom
					className="!font-bold !text-4xl mb-4"
				>
					Welcome to Football Predictor
				</Typography>

				<Typography variant="h6" className="text-gray-600 mb-6">
					Choose teams, players, and get AI-powered predictions for match
					results and player performance across European leagues.
				</Typography>

				<Button
					variant="contained"
					color="primary"
					size="large"
					className="!bg-blue-600 hover:!bg-blue-700 !text-white !px-6 !py-3 !text-lg rounded"
				>
					Get Started
				</Button>
			</Container>
		</main>
	);
};

export default Hero;
