import { Consumer } from 'sqs-consumer';
import { SQSClient } from '@aws-sdk/client-sqs';

export class SQSConsumer {

    /** 
     * @private
     * @constant
     * @type {string}
     * 
    **/
    AWS_ACCESS_KEY_ID = 'AWS_ACCESS_KEY_ID';
    /** 
     * @private
     * @constant
     * @type {string}
     * 
    **/
    AWS_REGION = 'AWS_REGION';
    /** 
     * @private
     * @constant
     * @type {string}
     * 
    **/
    AWS_SECRET_ACCESS_KEY = 'AWS_SECRET_ACCESS_KEY'

    // @property {SQSClient} sqs
    sqs: SQSClient;

    // @property {Consumer} app
    app: Consumer;
    constructor(data: {
        queueUrl: string,
        handleMessage: (message: any) => Promise<void>,
        region?: string,
        accessKeyId?: string,
        secretAccessKey?: string,
        pollingWaitTimeMs?: number,
        error? :{
            error?: (err: any) => void,
            processingError?: (err: any) => void,
            timeoutError?: (err: any) => void
        }
    }) {
        let _queueUrl = data.queueUrl;
        let _handleMessage = data.handleMessage;
        let _region = data.region || process.env[this.AWS_REGION];
        let _accessKeyId = data.accessKeyId || process.env[this.AWS_ACCESS_KEY_ID];
        let _secretAccessKey = data.secretAccessKey || process.env[this.AWS_SECRET_ACCESS_KEY];
        let _pollingWaitTimeMs = data.pollingWaitTimeMs || 3000;
        if (!_region) throw new Error('AWS_REGION is required')
        if (!_accessKeyId) throw new Error('AWS_ACCESS_KEY_ID is required')
        if (!_secretAccessKey) throw new Error('AWS_SECRET_ACCESS_KEY is required')
        this.sqs = new SQSClient({ region: _region, credentials: { accessKeyId: _accessKeyId, secretAccessKey: _secretAccessKey } });
        this.app = Consumer.create({
            queueUrl: _queueUrl,
            handleMessage: _handleMessage,
            sqs: this.sqs,
            pollingWaitTimeMs: _pollingWaitTimeMs
        });

        let logCallback = (err: any) => {console.log(err)}

        let _error = data.error || {};
        this.app.on('error', _error.error || logCallback);
        this.app.on('processing_error', _error.processingError || logCallback);
        this.app.on('timeout_error', _error.timeoutError || logCallback);
    }


    /**
     * Start the SQS consumer
     * @method
     */
    start() {
        if (this.app.isRunning) return;
        this.app.start();
    }

    // @property {boolean} isRunning
    get isRunning() {
        return this.app.isRunning;
    }

    /**
     * Stop the SQS consumer
     * @method
     * @param {boolean} [abort=true] - default true
    **/
    stop(abort = true) {
        if (!this.app.isRunning) return;
        this.app.stop({abort});
    }
    
    /**
     * @method
     * @param {string} event 
     * @param {callback} callback 
     */
    on(event: any, callback: (...args:any) => void) {
        this.app.on(event, callback);
    }


}