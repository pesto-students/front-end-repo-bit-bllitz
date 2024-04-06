import React from 'react'
import styles from "./CustomButton.module.scss"
import { Button } from '@mui/material'
const CustomButton = ({text,onClick,width}) => {
  return (
    <>
        <Button variant='contained' sx={{width:width}} onClick={onClick} className={styles.customButton} >
            {text}
        </Button>
    </>
  )
}

export default CustomButton