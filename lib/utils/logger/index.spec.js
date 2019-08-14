const {getLogger} = require('./index');

describe('utils/logger', () => {
    let mockConsole;
    let logger;

    beforeAll(() => {
        mockConsole = {
            content: '',

            log: function(...args) {
                this.content = [...args];
            },
        }
        logger = getLogger(mockConsole);
    });

    test('Testing normal log message', () => {

        logger.log('test', 'plop');

        expect(mockConsole.content).toHaveLength(2);
        expect(mockConsole.content).toEqual(['test', 'plop']);
    });

    test('Testing warning log message', () => {

        logger.warn('test', 'plop');

        expect(mockConsole.content).toHaveLength(2);
        expect(mockConsole.content[0]).toEqual('⚠️');
    });

    test('Testing error log message', () => {

        logger.err('test', 'plop');

        expect(mockConsole.content).toHaveLength(2);
        expect(mockConsole.content[0]).toEqual('🙀');
    });
}); 
  