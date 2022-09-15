/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Link } from '@mui/material'
import { Box } from '@mui/system'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useState } from 'react'

const ExpandableCell = ({ value }: GridRenderCellParams): JSX.Element => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Box>
      {expanded ? value : value.slice(0, 200)}&nbsp;
      {value.length > 200 && (
        <Link
          type="button"
          component="button"
          sx={{ fontSize: 'inherit' }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'ver menos' : 'ver mais'}
        </Link>
      )}
    </Box>
  )
}

export default ExpandableCell
