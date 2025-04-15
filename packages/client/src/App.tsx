import Header from "./components/Header";
import Hero from "./components/Hero";

function App() {
	return (
		<div className="min-h-screen bg-primary text-gray-900 font-sans">
			<Header />
			<div className="">
				<Hero />
			</div>
		</div>
	);
}

export default App;
