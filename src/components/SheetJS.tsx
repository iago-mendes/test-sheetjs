import { useEffect, useState } from 'react'
import XLSX from 'xlsx'

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

	async function parseFile()
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
		</div>
	)
}

export default SheetJS