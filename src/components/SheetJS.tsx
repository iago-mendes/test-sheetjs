import { useEffect, useState } from 'react'
import XLSX from 'xlsx'

import sheetColumns from '../../db/sheetColumns.json'

const fileTypes =
[
	'xlsx',
	'xls',
	'xml',
	'csv',
	'ods',
].map(function(x) { return '.' + x }).join(',')

const SheetJS: React.FC = () =>
{
	const [file, setFile] = useState<File>()

	useEffect(() =>
	{
		if (file)
			parseFile()
	}, [file])

	function parseFile()
	{
		const reader = new FileReader()
		const rABS = !!reader.readAsBinaryString

		reader.onload = (e) =>
		{
			const bstr = e.target.result
			const wb = XLSX.read(bstr, {type: rABS ? 'binary' : 'array'})
			
			const wsname = wb.SheetNames[0]
			const ws = wb.Sheets[wsname]
			
			// const data = XLSX.utils.sheet_to_json(ws, {header:1})
			const data = XLSX.utils.sheet_to_json(ws)
			// /* Update state */
			// this.setState({ data: data, cols: make_cols(ws['!ref']) })
			console.log('[data]', data)
		}

		if(rABS)
			reader.readAsBinaryString(file)
		else
			reader.readAsArrayBuffer(file)
	}

	function createTemplate()
	{
		let data: string[][] = []

		for (let i = 0; i < 10; i++)
		{
			let row: string[] = []

			for (let j = 0; j < sheetColumns.length; j++)
				row.push('')
			
			data.push(row)
		}

		const ws = XLSX.utils.aoa_to_sheet(data)
		
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')

		XLSX.writeFile(wb, 'sheetjs.xlsx')
	}

	return (
		<div>
			<h1>Upload a spreadsheet</h1>
			<input
				type='file'
				id='file'
				name='file'
				accept={fileTypes}
				onChange={e => setFile(e.target.files[0])}
			/>
			<br /> <br />
			<button onClick={createTemplate} >Download template</button>
		</div>
	)
}

export default SheetJS