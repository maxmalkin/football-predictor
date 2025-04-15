import { Header, Hero, TeamList } from "./components";

function App() {
	return (
		<div className="min-h-screen bg-primary text-gray-900 font-sans">
			<Header />
			<div className="">
				<Hero />
				<div className="p-8">
					<TeamList />
				</div>
			</div>
		</div>
	);
}

export default App;
