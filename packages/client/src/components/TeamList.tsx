import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import _ from "lodash";

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
	const [teamSeasons, setTeamSeasons] = useState<number[]>([]);

	const [selectedLeague, setSelectedLeague] = useState<number | "">("");
	const [selectedSeason, setSelectedSeason] = useState<number | "">("");
	const [selectedTeam, setSelectedTeam] = useState<number | "">("");
	const [selectedTeamSeason, setSelectedTeamSeason] = useState<number | "">("");

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLeagues = async () => {
			try {
				const res = await fetch("http://localhost:8080/leagues");
				if (!res.ok) throw new Error("Failed to load leagues");
				const data = await res.json();
				const sorted = data.leagues.sort((a: League, b: League) =>
					a.name.localeCompare(b.name)
				);
				setLeagues(sorted);
			} catch {
				setError("Unable to fetch leagues.");
			}
		};

		fetchLeagues();
	}, []);

	useEffect(() => {
		if (selectedLeague === "") {
			setSeasons([]);
			setSelectedSeason("");
			return;
		}

		const league = leagues.find((l) => l.id === selectedLeague);
		if (league) {
			setSeasons(league.seasons);
			setSelectedSeason(league.seasons[0] || "");
		}
	}, [selectedLeague, leagues]);

	useEffect(() => {
		if (selectedLeague === "" || selectedSeason === "") return;

		const fetchTeams = async () => {
			try {
				const res = await fetch(
					`http://localhost:8080/teams?league=${selectedLeague}&season=${selectedSeason}`
				);
				if (!res.ok) throw new Error("Failed to load teams");
				const data = await res.json();

				// remove dupes
				const uniqueTeams = _.uniqBy(data.teams, "name");
				setTeams(uniqueTeams);
				setSelectedTeam("");
				setTeamSeasons([]);
			} catch {
				setError("Unable to fetch teams.");
			}
		};

		fetchTeams();
	}, [selectedLeague, selectedSeason]);

	useEffect(() => {
		if (selectedTeam === "") return;

		const fetchTeamSeasons = async () => {
			try {
				const res = await fetch(
					`http://localhost:8080/teams/seasons?team=${selectedTeam}`
				);
				if (!res.ok) throw new Error("Failed to load team seasons");
				const data = await res.json();
				setTeamSeasons(data.seasons || []);
				setSelectedTeamSeason(data.seasons?.[0] || "");
			} catch {
				setTeamSeasons([]);
				setSelectedTeamSeason("");
			}
		};

		fetchTeamSeasons();
	}, [selectedTeam]);

	if (error) return <div className="text-red-500">{error}</div>;

	return (
		<>
			<Typography className="!text-left !font-bold !text-white !mb-4 !text-3xl">
				Find your favorite team!
			</Typography>
			<div className="flex flex-col sm:flex-row gap-4 mb-6">
				<select
					value={selectedLeague}
					onChange={(e) => setSelectedLeague(Number(e.target.value))}
					className="bg-white bg-opacity-10 text-white p-2 rounded-xl shadow-md"
				>
					<option value="" className="text-black">
						Select a League
					</option>
					{leagues.map((league) => (
						<option key={league.id} value={league.id} className="text-black">
							{league.name}
						</option>
					))}
				</select>
				{selectedLeague !== "" && (
					<select
						value={selectedSeason}
						onChange={(e) => setSelectedSeason(Number(e.target.value))}
						className="bg-white bg-opacity-10 text-white p-2 rounded-xl shadow-md"
					>
						{seasons.map((s) => (
							<option key={s} value={s} className="text-black">
								{s}
							</option>
						))}
					</select>
				)}
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-6">
				{teams.map((team) => (
					<button
						key={team.id}
						className={`bg-white bg-opacity-10 rounded-xl p-4 text-center shadow-md transition hover:bg-opacity-20`}
					>
						<img
							src={team.logo || "../../public/ball_placeholder.png"}
							// alt={team.name}
							className="h-12 mx-auto mb-2"
						/>
						<p className="text-sm font-semibold text-white">{team.name}</p>
					</button>
				))}
			</div>
			{selectedTeam && teamSeasons.length > 0 && (
				<div className="mb-8">
					<label className="block text-white mb-2">
						Select Season for Team
					</label>
					<select
						value={selectedTeamSeason}
						onChange={(e) => setSelectedTeamSeason(Number(e.target.value))}
						className="bg-white bg-opacity-10 text-white p-2 rounded-xl shadow-md"
					>
						{teamSeasons.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
				</div>
			)}
		</>
	);
};
