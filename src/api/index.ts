import { http, HttpResponse } from "msw";

export interface Consents {
	id: number;
	name: string;
	email: string;
	newsletter: boolean;
	targetedAds: boolean;
	statistics: boolean;
}

const consents: Consents[] = [
	{
		id: 0,
		name: "Bojack Horseman",
		email: "bojack@horseman.com",
		newsletter: true,
		targetedAds: true,
		statistics: false,
	},
	{
		id: 1,
		name: "Princess Carolyn",
		email: "princess@manager.com",
		newsletter: true,
		targetedAds: false,
		statistics: false,
	},
	{
		id: 2,
		name: "Princess Carolyn",
		email: "princess@manager.com",
		newsletter: false,
		targetedAds: false,
		statistics: false,
	},
];

export const handlers = [
	http.get(/\/consents/, ({ request }) => {
		const url = new URL(request.url);

		const page = Number(url.searchParams.get("page"));
		const offset = Number(url.searchParams.get("offset"));

		return HttpResponse.json({
			data: consents.slice(page * offset, page * offset + offset),
		});
	}),
	http.post(/\/consents/, async ({ request }) => {
		const newConsent = (await request.json()) as Omit<Consents, "id">;

		consents.push({
			id: consents.length,
			...newConsent,
		});

		return HttpResponse.json({
			data: consents[consents.length - 1],
		});
	}),
];
