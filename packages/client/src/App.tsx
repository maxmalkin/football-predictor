import Header from "./components/Header";
import Hero from "./components/Hero";

function App() {
	return (
		<div className="min-h-screen text-gray-900 font-sans">
			<Header />
			<div className="flex justify-center items-center">
				<Hero />
			</div>
		</div>
	);
}

export default App;
