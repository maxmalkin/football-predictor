import { useEffect, useState } from "react";
import {
	Typography,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
} from "@mui/material";

type Team = {
	id: number;
	name: string;
	logo: string;
};

type League = {
	id: number;
	name: string;
	seasons: number[];
};

export const TeamList = () => {
	const [teams, setTeams] = useState<Team[]>([]);
	const [leagues, setLeagues] = useState<League[]>([]);
	const [seasons, setSeasons] = useState<number[]>([]);
	const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
	const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLeagues = async () => {
			try {
				const res = await fetch("http://localhost:8080/leagues");
				if (!res.ok) throw new Error("Failed to load leagues");
				const data = await res.json();
				setLeagues(data.leagues);
			} catch (err) {
				setError("Unable to fetch leagues.");
			}
		};

		fetchLeagues();
	}, []);

	useEffect(() => {
		if (selectedLeague !== null) {
			const league = leagues.find((l) => l.id === selectedLeague);
			if (league) {
				setSeasons(league.seasons);
				setSelectedSeason(league.seasons[0]);
			}
		}
	}, [selectedLeague, leagues]);

	useEffect(() => {
		const fetchTeams = async () => {
			if (selectedLeague === null || selectedSeason === null) return;
			try {
				const res = await fetch(
					`http://localhost:8080/teams?league=${selectedLeague}&season=${selectedSeason}`
				);
				if (!res.ok) throw new Error("Failed to load teams");
				const data = await res.json();
				setTeams(data.teams);
			} catch (err) {
				setError("Unable to fetch teams.");
			}
		};

		fetchTeams();
	}, [selectedLeague, selectedSeason]);

	if (error) return <div className="text-red-500">{error}</div>;

	return (
		<>
			<div className="flex flex-col gap-4 items-start justify-between mb-6">
				<Typography className="!text-left !font-bold !text-white !text-3xl">
					Find your favorite team!
				</Typography>

				<div className="flex space-x-4 w-full">
					<FormControl size="small" className="!w-full bg-white rounded">
						<InputLabel id="league-label">League</InputLabel>
						<Select
							labelId="league-label"
							value={selectedLeague || ""}
							onChange={(e) => setSelectedLeague(Number(e.target.value))}
							label="League"
						>
							{leagues.map((l) => (
								<MenuItem key={l.id} value={l.id}>
									{l.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl size="small" className="!w-full bg-white rounded">
						<InputLabel id="season-label">Season</InputLabel>
						<Select
							labelId="season-label"
							value={selectedSeason || ""}
							onChange={(e) => setSelectedSeason(Number(e.target.value))}
							label="Season"
						>
							{seasons.map((s) => (
								<MenuItem key={s} value={s}>
									{s}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
				{teams.map((team) => (
					<div
						key={team.id}
						className="bg-white bg-opacity-10 rounded-xl p-4 text-center hover:bg-opacity-20 transition shadow-md"
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
