import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
	return (
		<AppBar position="static" className="bg-gray-900 shadow">
			<Toolbar className="px-4">
				<Typography variant="h6" component="div" className="text-white">
					Football Predictor
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
