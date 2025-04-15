import { Typography } from "@mui/material";

const Hero = () => {
	return (
		<div className="px-4 p-8 rounded-xl">
			<div className="w-full px-4 flex flex-col">
				<Typography className="!font-black !text-6xl mb-4 text-white">
					Football predictions for you.
				</Typography>
				<Typography variant="h6" className="text-white">
					Get AI powered predictions for upcoming football matches and create
					hypothetical matchups between your favorite clubs.
				</Typography>
			</div>
		</div>
	);
};

export default Hero;
