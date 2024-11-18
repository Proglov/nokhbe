import { Box } from "@mui/material";


export default function Component({ type, item }) {

    if (type === 'ideas') return (
        <div className="border rounded-xl p-3 m-3 min-w-40 my-3">
            <Box>
                عنوان:
                {' '}
                {item.name}
            </Box>
            <Box>
                شرح مختصر:
                {' '}
                {item.briefDiscription}
            </Box>
            <Box>
                درخواست دهنده:
                {' '}
                {item.applicant}
            </Box>
            <Box>
                بودجه:
                {' '}
                {item.budget}
            </Box>
        </div>
    )

    else if (type === 'investors') return (
        <div className="border rounded-xl p-3 min-w-40 my-3">
            <Box>
                نام:
                {' '}
                {item.name}
            </Box>
            <Box>
                شرایط سرمایه گذار:
                {' '}
                {item.conditions}
            </Box>
            <Box>
                بودجه:
                {' '}
                {item.budget}
            </Box>
        </div>
    )

    return (
        <div className="border rounded-xl p-3 min-w-40 my-3">
            <Box>
                نام:
                {' '}
                {item.name}
            </Box>
            <Box>
                نویسنده:
                {' '}
                {item.writer}
            </Box>
            {
                type === 'books' ?
                    <Box>
                        انتشارات:
                        {' '}
                        {item.publisher}
                    </Box>
                    :
                    <Box>
                        مجله:
                        {' '}
                        {item.magazine}
                    </Box>
            }
            <Box>
                دسته بندی:
                {' '}
                {item.category}
            </Box>
            <Box>
                لینک:
                {' '}
                {!!item.link ? item.link : 'فاقد لینک'}
            </Box>
        </div>
    )
}
