 const env = `window._ENV_ = {
	PUBLIC_URL: "${process.env.PUBLIC_URL}",
	ROLLBAR_ACCESS_TOKEN: "${process.env.ROLLBAR_ACCESS_TOKEN}",
};
`;
module.exports = {
	env
}