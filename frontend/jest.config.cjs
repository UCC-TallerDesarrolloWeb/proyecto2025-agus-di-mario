module.exports = {
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['@testing-library/jest-dom'],
	transform: {
		'^.+\\.[jt]sx?$': 'babel-jest',
	},
	moduleNameMapper: {
		// SCSS primero — antes que los alias @styles
		'\\.(scss|css)$': 'identity-obj-proxy',
		// Alias de Vite
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@pages/(.*)$': '<rootDir>/src/pages/$1',
		'^@styles/(.*)$': '<rootDir>/src/styles/$1',
		'^@assets/(.*)$': '<rootDir>/src/assets/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
		'^@api/(.*)$': '<rootDir>/src/api/$1',
	},
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
}
