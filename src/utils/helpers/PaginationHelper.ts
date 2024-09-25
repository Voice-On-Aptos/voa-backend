import AppError from "./AppError";

async function paginateModel(
	model: any,
	query: any = {},
	page = 1,
	limit = 10,
	sort: any = { createdAt: -1 },
	exclude: string = ""
) {
	try {
		const totalDocuments = await model.countDocuments(query);

		const skip = (page - 1) * limit;

		const documents = await model
			.find(query)
			.skip(skip)
			.limit(limit)
			.sort(sort)
			.select(exclude)
			.exec();

		return {
			data: documents,
			currentPage: page,
			totalPages: Math.ceil(totalDocuments / limit),
			totalDocuments,
		};
	} catch (error: any) {
		throw new AppError(500, error.message);
	}
}

export { paginateModel };
