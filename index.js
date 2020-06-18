var Validator = require('jsonschema').Validator;
var v = new Validator();


var schema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "minLength": 28,
            "pattern": /^PAY/,
        },
        "create_time": {
            "type": "string",
            "format": "date-time",
        },
        "update_time": {
            "type": "string",
            "format": "date-time",
        },
        "state": {
            "type": "string"
        },
        "intent": {
            "type": "string"
        },
        "player": {
            "type": "object",
            "properties": {
                "payment_method": {
                    "type": "string"
                }
            }
        },
        "transactions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "amount": {
                        "type": "object",
                        "properties": {
                            // "total": {
                            //     "type": "number",
                            //     'minimum': 0.001
                            // },
                            "currency": {
                                'type': 'string',
                            },
                            'datails': {
                                'type': 'object',
                                'properties': {
                                    "subtotal": {
                                        "type": 'number',
                                        'minimum': 0.001
                                    },
                                    "tax": {
                                        "type": 'number',
                                        'minimum': 0.001
                                    },
                                    "shipping": {
                                        "type": 'number',
                                        'minimum': 0.001
                                    },
                                    "handling_fee": {
                                        "type": 'number',
                                        'minimum': 0.001
                                    },
                                    "insurance": {
                                        "type": 'number',
                                        'minimum': 0.001
                                    },
                                    "shipping_discount": {
                                        "type": 'number',
                                        'maximum': 0
                                    },
                                    "required": [
                                        "subtotal",
                                        "tax",
                                        "shipping",
                                        "handling_fee",
                                        "insurance",
                                        "shipping_discount",
                                    ]
                                }
                            },
                            'description': {
                                'type': 'string'
                            },
                            'item_list': {
                                'type': 'object',
                                'properties': {
                                    'items': {
                                        'type': "array",
                                        'items': {
                                            'type': 'object',
                                            'properties': {
                                                "name": {
                                                    'type': 'string',
                                                    "minLength": 1,
                                                },
                                                "sku": {
                                                    'type': 'number',
                                                    "minimum": 1,
                                                },
                                                "price": {
                                                    'type': 'number',
                                                    "minimum": 0.001,
                                                },
                                                "currency": {
                                                    'type': 'string',
                                                    "minLength": 1,
                                                },
                                                "quantity": {
                                                    'type': 'number',
                                                    "minimum": 1,
                                                },
                                                "description": {
                                                    'type': 'string',
                                                    "minLength": 1,
                                                },
                                                "tax": {
                                                    'type': 'number',
                                                    "minimum": 0,
                                                },
                                                'required': [
                                                    "name",
                                                    "sku",
                                                    "price",
                                                    "currency",
                                                    "quantity",
                                                    "description",
                                                    "tax"
                                                ],
                                            },
                                        },
                                        "minItems": 1,
                                    },
                                    "shipping_address": {
                                        'type': 'object',
                                        'propertires': {
                                            "recipient_name": {
                                                'type': 'string'
                                            },
                                            "line1": {
                                                'type': 'string'
                                            },
                                            "line2": {
                                                'type': 'string'
                                            },
                                            "city": {
                                                'type': 'string'
                                            },
                                            "state": {
                                                'type': 'string',
                                                "minLength": 2,
                                            },
                                            "phone": {
                                                'type': 'string',
                                                'pattern': /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                                            },
                                            "postal_code": {
                                                "type": 'string'
                                            },
                                            "country_code": {
                                                'type': 'string'
                                            },
                                        },
                                        'required': [
                                            "recipient_name",
                                            "line1",
                                            "line2",
                                            "city",
                                            "state",
                                            "phone",
                                            "postal_code",
                                            "country_code"
                                        ]
                                    }
                                }
                            },
                            'required': [
                                // 'total',
                                'currency',
                                'datails',
                                'description',
                                'item_list'
                            ]
                        }
                    }
                }
            },
            "minItems": 1,
        }

    }
};
const fs = require('fs');
const util = require('util')

let rawdata = fs.readFileSync('./payment.json');
var payment = JSON.parse(rawdata)

console.log(util.inspect(payment, false, null, true /* enable colors */))

// console.log()

// console.log(typeof payment.transactions[0].amount.details.subtotal)
console.log(v.validate(payment, schema));
