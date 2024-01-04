import { useState } from 'react';
import './App.css';
import SrpBad from '../1srp/bad';
import SrpGood from '../1srp/good';
import OCPPage from '../2ocp';

const pages = {
	SRPBad: 'srp-bad',
	SRPGood: 'srp-good',
	OCP: 'ocp',
};

function App() {
	const [page, setPage] = useState('');

	return (
		<div className="App">
			<header>
				<button
					onClick={() => {
						setPage(pages.SRPBad);
					}}
				>
					SRP-Bad
				</button>
				<button
					onClick={() => {
						setPage(pages.SRPGood);
					}}
				>
					SRP-Good
				</button>
				<button
					onClick={() => {
						setPage(pages.OCP);
					}}
				>
					OCP
				</button>
			</header>
			{page === pages.SRPBad && <SrpBad />}
			{page === pages.SRPGood && <SrpGood />}
			{page === pages.OCP && <OCPPage />}
		</div>
	);
}

export default App;
