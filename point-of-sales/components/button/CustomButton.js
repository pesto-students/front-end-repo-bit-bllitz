import React from 'react'
import styles from "./CustomButton.module.scss"
import { Button } from '@mui/material'
const CustomButton = ({text,onClick}) => {
  return (
    <div>
        <Button variant='contained' onClick={onClick} className={styles.customButton} >
            {text}
        </Button>
    </div>
  )
}

export default CustomButton