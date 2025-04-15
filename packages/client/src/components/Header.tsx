import { AppBar, Toolbar, Typography } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const Header = () => {
	return (
		<AppBar position="static" className="!bg-primary shadow-md " elevation={0}>
			<Toolbar className="px-6 space-x-3">
				<SportsSoccerIcon className="text-white !text-4xl" />
				<Typography
					variant="h6"
					component="div"
					className="text-white !font-bold !text-2xl tracking-tight"
				>
					MatchMetrics
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
