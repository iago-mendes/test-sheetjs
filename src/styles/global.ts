import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
	:root
	{
		font-size: 10px;
	}

	*
	{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		outline: none;
		-webkit-tap-highlight-color: transparent;
	}

	body
	{
		background-color: ${p => p.theme.background};
		color: ${p => p.theme.text};
	}

	body, input, textarea, button
	{
		font-family: Roboto;
	}

	button
	{
		cursor: pointer;
	}

	a
	{
		color: inherit;
		text-decoration: none;
	}

	#__next
	{}
`