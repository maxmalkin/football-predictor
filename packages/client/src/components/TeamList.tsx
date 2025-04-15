import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

type Team = {
	id: number;
	name: string;
	logo: string;
};

export const TeamList = () => {
	const [teams, setTeams] = useState<Team[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [league, setLeague] = useState<number>(39);
	const [season, setSeason] = useState<number>(2023);

	useEffect(() => {
		const fetchTeams = async () => {
			try {
				const res = await fetch(
					`http://localhost:8080/teams?league=${league}&season=${season}`
				);
				if (!res.ok) throw new Error("Failed to load teams");
				const data = await res.json();
				setTeams(data.teams);
			} catch (err) {
				setError("Unable to fetch teams.");
			}
		};

		fetchTeams();
	}, [league, season]);

	if (error) return <div className="text-red-500">{error}</div>;

	return (
		<>
			<Typography className="!text-left !font-bold !text-white !mb-4 !text-3xl">
				Find your favorite team!
			</Typography>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
				{teams.map((team) => (
					<div
						key={team.id}
						className="bg-white bg-opacity-10 rounded-xl p-4  text-center shadow-md"
					>
						<img
							src={team.logo}
							alt={team.name}
							className="h-12 mx-auto mb-2"
						/>
						<p className="text-sm font-semibold text-white">{team.name}</p>
					</div>
				))}
			</div>
		</>
	);
};
