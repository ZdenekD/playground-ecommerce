import {validationResult} from 'express-validator';

const handleError = req => validationResult(req).array().map(error => error.msg)[0];

export default handleError;
