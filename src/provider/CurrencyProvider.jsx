import { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext();
export const useCurrency = () => useContext(CurrencyContext);

const CurrencyProvider = ({ children }) => {
	const [currency, setCurrency] = useState("USD");
	const [rates, setRates] = useState({ USD: 1, EUR: 1, GBP: 1 });

	useEffect(() => {
		const fetchrates = async () => {
			try {
				const response = await fetch(
					"https://api.coinbase.com/v2/exchange-rates?currency=USD"
				);
				const data = await response.json();
				const currencyRates = data.data.rates;
				setRates({
					USD: 1,
					EUR: currencyRates.EUR,
					GBP: currencyRates.GBP,
				});
			} catch (err) {
				console.error("Error fetching rates:", err);
			}
		};
		fetchrates();
	}, [currency]);

	return (
		<CurrencyContext.Provider value={{ currency, setCurrency, rates }}>
			{children}
		</CurrencyContext.Provider>
	);
};

export default CurrencyProvider;
