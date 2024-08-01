

export const getQueries = (page, perPage, justPositiveStatus) => {
    let queryObj = {
        orderBy: {
            createdAt: 'desc'
        },
    };
    let countObj = {}
    if (!!page && !!perPage && typeof page === 'number' && typeof perPage === 'number') {
        queryObj = {
            ...queryObj,
            take: perPage,
            skip: perPage * (page - 1)
        }
    }
    if (!!justPositiveStatus && justPositiveStatus === "true") {
        queryObj = {
            ...queryObj,
            where: {
                status: true
            }
        }

        countObj = { where: { status: true } }
    }
    return { queryObj, countObj }
}

export const getParams = url => {
    const serarch = new URL(url).search;
    const params = new URLSearchParams(serarch)
    const page = parseInt(params.get("page"))
    const perPage = parseInt(params.get("perPage"))
    const justPositiveStatus = params.get("justPositiveStatus")
    return { page, perPage, justPositiveStatus }
}