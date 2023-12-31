import { useState } from "react";
function App() {
	const [calc, setCalc] = useState("");
	const [result, setResult] = useState("");
	const ops = ['/', '*', '+', '-', '.'];

	const updateCalc = value => {
		if (
			(value === "." && calc.includes(".")) ||
			ops.includes(value) && calc === '' ||
			ops.includes(value) && ops.includes(calc.slice(-1))
		) {
			return;
		}
		setCalc(calc + value);
		if (!ops.includes(value)) {
			setResult(eval(calc + value).toString());
		}
	}
	const handleClear = () => {
		setCalc("");
		setResult("");
	};

	const createdigits = () => {
		const digits = [];
		for (let i = 1; i < 10; i++) {
			digits.push(
				<button onClick={() => updateCalc(i.toString())}
					key={i}>{i}</button>
			)
		}
		return digits;
	}
	const calculate = () => {
		setCalc(eval(calc).toString());
	}
	const deletelast = () => {
		if (calc === "") {
			return;
		}
		const value = calc.slice(0, -1);
		setCalc(value);

		if (value === "") {
			setResult("");
		} else {
			setResult(eval(value).toString());
		}
	};
	return (
		<div className="App">
			<div className="calculator">
				<div className="display">
					{result ? <span>({result})</span> : ''}&nbsp; {calc || "0"}
				</div>
				<div className="operators">
					<button onClick={() => updateCalc('/')}>/</button>
					<button onClick={() => updateCalc('*')}>*</button>
					<button onClick={() => updateCalc('+')}>+</button>
					<button onClick={() => updateCalc('-')}>-</button>

					<button onClick={deletelast}>DEL</button>
				</div>
				<div className="digits">
					{createdigits()}
					<button onClick={() => updateCalc('0')}>0</button>
					<button onClick={() => updateCalc('.')}>.</button>
					<button onClick={calculate}> = </button>
					<button onClick={handleClear}>
						Clear
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
