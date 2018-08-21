const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

require('babel-register')({
	presets: ['env', 'react']
});

require('browser-env')();

configure({ adapter: new Adapter() });