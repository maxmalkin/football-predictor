import {
	Container,
	Typography,
	Box,
	Button,
	AppBar,
	Toolbar,
} from "@mui/material";

function App() {
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div">
						Football Predictor
					</Typography>
				</Toolbar>
			</AppBar>

			<Container maxWidth="md">
				<Box textAlign="center" mt={8}>
					<Typography variant="h3" gutterBottom>
						Welcome to Football Predictor
					</Typography>

					<Typography variant="body1" mb={4}>
						Enter team data, match stats, and get AI-driven predictions for
						match outcomes and player performance.
					</Typography>

					<Button variant="contained" color="primary" size="large">
						Get Started
					</Button>
				</Box>
			</Container>
		</>
	);
}

export default App;
