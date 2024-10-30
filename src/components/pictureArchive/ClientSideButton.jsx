'use client'
import { Box } from '@mui/material'
import { ModalContext } from './ModalImages'
import { useContext } from 'react'


export default function ClientSideButton({ children, links }) {
    const { setIsModalDeleteOpen, setRefs } = useContext(ModalContext)

    return (
        <Box onClick={() => { setIsModalDeleteOpen(true); setRefs(links) }}>{children}</Box>
    )
}
