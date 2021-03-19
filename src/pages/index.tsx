import Head from 'next/head'
import SheetJS from '../components/SheetJS'

import Container from '../styles/pages/index'

const Home: React.FC = () =>
{
	return (
		<Container>
			<Head>
				<title>Home</title>
			</Head>
			<SheetJS />
		</Container>
	)
}

export default Home