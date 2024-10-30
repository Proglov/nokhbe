import { Box } from "@mui/material";


export default function Component({ type, item }) {

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
