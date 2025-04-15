import { Container, Typography, Button } from "@mui/material";

const Hero = () => {
	return (
		<div className=" px-4 p-8 rounded-xl">
			<Container maxWidth="md" className="grid grid-cols-2 items-center">
				<Typography className="!font-black !text-6xl mb-4 text-white">
					Welcome!
				</Typography>
				<Typography variant="h6" className="text-white">
					Get AI powered predictions for upcoming football matches and create
					hypothetical matchups.
				</Typography>
			</Container>
			<Button
				variant="contained"
				color="primary"
				size="large"
				className="!rounded-2xl !bg-accent-orange hover:!bg-accent-red !text-primary !font-extrabold !px-6 !py-3 !text-lg shadow-xl shadow-accent-orange"
			>
				GET STARTED
			</Button>
		</div>
	);
};

export default Hero;
