var select = require('js-select');
var source = require('./source.json');

var tree = {
    "range": [
        205,
        398
    ],
    "loc": {
        "start": {
            "line": 7,
            "column": 0
        },
        "end": {
            "line": 20,
            "column": 32
        }
    },
    "type": "Program",
    "body": [
        {
            "range": [
                205,
                341
            ],
            "loc": {
                "start": {
                    "line": 7,
                    "column": 0
                },
                "end": {
                    "line": 17,
                    "column": 17
                }
            },
            "type": "ExpressionStatement",
            "expression": {
                "range": [
                    205,
                    341
                ],
                "loc": {
                    "start": {
                        "line": 7,
                        "column": 0
                    },
                    "end": {
                        "line": 17,
                        "column": 17
                    }
                },
                "type": "CallExpression",
                "callee": {
                    "range": [
                        205,
                        211
                    ],
                    "loc": {
                        "start": {
                            "line": 7,
                            "column": 0
                        },
                        "end": {
                            "line": 7,
                            "column": 6
                        }
                    },
                    "type": "Identifier",
                    "name": "define"
                },
                "arguments": [
                    {
                        "range": [
                            212,
                            221
                        ],
                        "loc": {
                            "start": {
                                "line": 7,
                                "column": 7
                            },
                            "end": {
                                "line": 7,
                                "column": 16
                            }
                        },
                        "type": "Literal",
                        "value": "connect",
                        "raw": "'connect'"
                    },
                    {
                        "range": [
                            222,
                            279
                        ],
                        "loc": {
                            "start": {
                                "line": 7,
                                "column": 17
                            },
                            "end": {
                                "line": 12,
                                "column": 1
                            }
                        },
                        "type": "ArrayExpression",
                        "elements": [
                            {
                                "range": [
                                    226,
                                    232
                                ],
                                "loc": {
                                    "start": {
                                        "line": 8,
                                        "column": 2
                                    },
                                    "end": {
                                        "line": 8,
                                        "column": 8
                                    }
                                },
                                "type": "Literal",
                                "value": "core",
                                "raw": "'core'"
                            },
                            {
                                "range": [
                                    236,
                                    253
                                ],
                                "loc": {
                                    "start": {
                                        "line": 9,
                                        "column": 2
                                    },
                                    "end": {
                                        "line": 9,
                                        "column": 19
                                    }
                                },
                                "type": "Literal",
                                "value": "network/request",
                                "raw": "'network/request'"
                            },
                            {
                                "range": [
                                    257,
                                    266
                                ],
                                "loc": {
                                    "start": {
                                        "line": 10,
                                        "column": 2
                                    },
                                    "end": {
                                        "line": 10,
                                        "column": 11
                                    }
                                },
                                "type": "Literal",
                                "value": "promise",
                                "raw": "'promise'"
                            },
                            {
                                "range": [
                                    270,
                                    277
                                ],
                                "loc": {
                                    "start": {
                                        "line": 11,
                                        "column": 2
                                    },
                                    "end": {
                                        "line": 11,
                                        "column": 9
                                    }
                                },
                                "type": "Literal",
                                "value": "utils",
                                "raw": "'utils'"
                            }
                        ]
                    },
                    {
                        "range": [
                            281,
                            340
                        ],
                        "loc": {
                            "start": {
                                "line": 12,
                                "column": 3
                            },
                            "end": {
                                "line": 17,
                                "column": 16
                            }
                        },
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [
                            {
                                "range": [
                                    291,
                                    294
                                ],
                                "loc": {
                                    "start": {
                                        "line": 12,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 12,
                                        "column": 16
                                    }
                                },
                                "type": "Identifier",
                                "name": "EVT"
                            },
                            {
                                "range": [
                                    296,
                                    300
                                ],
                                "loc": {
                                    "start": {
                                        "line": 12,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 12,
                                        "column": 22
                                    }
                                },
                                "type": "Identifier",
                                "name": "node"
                            },
                            {
                                "range": [
                                    302,
                                    309
                                ],
                                "loc": {
                                    "start": {
                                        "line": 12,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 12,
                                        "column": 31
                                    }
                                },
                                "type": "Identifier",
                                "name": "Promise"
                            },
                            {
                                "range": [
                                    311,
                                    316
                                ],
                                "loc": {
                                    "start": {
                                        "line": 12,
                                        "column": 33
                                    },
                                    "end": {
                                        "line": 12,
                                        "column": 38
                                    }
                                },
                                "type": "Identifier",
                                "name": "Utils"
                            }
                        ],
                        "defaults": [],
                        "body": {
                            "range": [
                                318,
                                340
                            ],
                            "loc": {
                                "start": {
                                    "line": 12,
                                    "column": 40
                                },
                                "end": {
                                    "line": 17,
                                    "column": 16
                                }
                            },
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "range": [
                                        326,
                                        339
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 17,
                                            "column": 2
                                        },
                                        "end": {
                                            "line": 17,
                                            "column": 15
                                        }
                                    },
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "range": [
                                            326,
                                            338
                                        ],
                                        "loc": {
                                            "start": {
                                                "line": 17,
                                                "column": 2
                                            },
                                            "end": {
                                                "line": 17,
                                                "column": 14
                                            }
                                        },
                                        "type": "Literal",
                                        "value": "use strict",
                                        "raw": "'use strict'"
                                    }
                                }
                            ]
                        },
                        "generator": false,
                        "expression": false
                    }
                ]
            },
            "leadingComments": [
                {
                    "type": "Line",
                    "value": " Life, Universe, and Everything",
                    "range": [
                        0,
                        33
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 33
                        }
                    }
                },
                {
                    "type": "Line",
                    "value": " ## HTTP.JS",
                    "range": [
                        34,
                        47
                    ],
                    "loc": {
                        "start": {
                            "line": 2,
                            "column": 0
                        },
                        "end": {
                            "line": 2,
                            "column": 13
                        }
                    }
                },
                {
                    "type": "Line",
                    "value": " **The request module attaches the Node.js api() method to the EVT module.",
                    "range": [
                        49,
                        125
                    ],
                    "loc": {
                        "start": {
                            "line": 4,
                            "column": 0
                        },
                        "end": {
                            "line": 4,
                            "column": 76
                        }
                    }
                },
                {
                    "type": "Line",
                    "value": " It controls the raw request to the API, using the \"request\" node module.**",
                    "range": [
                        126,
                        203
                    ],
                    "loc": {
                        "start": {
                            "line": 5,
                            "column": 0
                        },
                        "end": {
                            "line": 5,
                            "column": 77
                        }
                    }
                }
            ],
            "trailingComments": [
                {
                    "type": "Line",
                    "value": " Leading comment  ",
                    "range": [
                        345,
                        365
                    ],
                    "loc": {
                        "start": {
                            "line": 19,
                            "column": 0
                        },
                        "end": {
                            "line": 19,
                            "column": 20
                        }
                    }
                }
            ]
        },
        {
            "range": [
                366,
                398
            ],
            "loc": {
                "start": {
                    "line": 20,
                    "column": 0
                },
                "end": {
                    "line": 20,
                    "column": 32
                }
            },
            "type": "ExpressionStatement",
            "expression": {
                "range": [
                    366,
                    397
                ],
                "loc": {
                    "start": {
                        "line": 20,
                        "column": 0
                    },
                    "end": {
                        "line": 20,
                        "column": 31
                    }
                },
                "type": "CallExpression",
                "callee": {
                    "range": [
                        366,
                        372
                    ],
                    "loc": {
                        "start": {
                            "line": 20,
                            "column": 0
                        },
                        "end": {
                            "line": 20,
                            "column": 6
                        }
                    },
                    "type": "Identifier",
                    "name": "define"
                },
                "arguments": [
                    {
                        "range": [
                            373,
                            381
                        ],
                        "loc": {
                            "start": {
                                "line": 20,
                                "column": 7
                            },
                            "end": {
                                "line": 20,
                                "column": 15
                            }
                        },
                        "type": "Literal",
                        "value": "module",
                        "raw": "'module'"
                    },
                    {
                        "range": [
                            383,
                            396
                        ],
                        "loc": {
                            "start": {
                                "line": 20,
                                "column": 17
                            },
                            "end": {
                                "line": 20,
                                "column": 30
                            }
                        },
                        "type": "FunctionExpression",
                        "id": null,
                        "params": [],
                        "defaults": [],
                        "body": {
                            "range": [
                                394,
                                396
                            ],
                            "loc": {
                                "start": {
                                    "line": 20,
                                    "column": 28
                                },
                                "end": {
                                    "line": 20,
                                    "column": 30
                                }
                            },
                            "type": "BlockStatement",
                            "body": []
                        },
                        "generator": false,
                        "expression": false
                    }
                ]
            },
            "leadingComments": [
                {
                    "type": "Line",
                    "value": " Leading comment  ",
                    "range": [
                        345,
                        365
                    ],
                    "loc": {
                        "start": {
                            "line": 19,
                            "column": 0
                        },
                        "end": {
                            "line": 19,
                            "column": 20
                        }
                    }
                }
            ]
        }
    ],
    "sourceType": "script",
    "comments": [
        {
            "type": "Line",
            "value": " Life, Universe, and Everything",
            "range": [
                0,
                33
            ],
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 33
                }
            }
        },
        {
            "type": "Line",
            "value": " ## HTTP.JS",
            "range": [
                34,
                47
            ],
            "loc": {
                "start": {
                    "line": 2,
                    "column": 0
                },
                "end": {
                    "line": 2,
                    "column": 13
                }
            }
        },
        {
            "type": "Line",
            "value": " **The request module attaches the Node.js api() method to the EVT module.",
            "range": [
                49,
                125
            ],
            "loc": {
                "start": {
                    "line": 4,
                    "column": 0
                },
                "end": {
                    "line": 4,
                    "column": 76
                }
            }
        },
        {
            "type": "Line",
            "value": " It controls the raw request to the API, using the \"request\" node module.**",
            "range": [
                126,
                203
            ],
            "loc": {
                "start": {
                    "line": 5,
                    "column": 0
                },
                "end": {
                    "line": 5,
                    "column": 77
                }
            }
        },
        {
            "type": "Line",
            "value": " Leading comment  ",
            "range": [
                345,
                365
            ],
            "loc": {
                "start": {
                    "line": 19,
                    "column": 0
                },
                "end": {
                    "line": 19,
                    "column": 20
                }
            }
        }
    ]
};

//console.log(select(source, '.type:val("FunctionDeclaration") ~ .id').nodes());
//console.log(select(source, '.type:val("FunctionExpression") ~ .id').nodes());
//console.log(select(source, '.type:val("VariableDeclaration") ~ .id').nodes());
//console.log(select(source, '.type:val("ExpressionStatement") ~ .expression > .left').nodes());

//console.log(select(source, '.type:val("IfStatement")').nodes().length);
//console.log(select(source, '.type:val("FunctionDeclaration")').nodes().length);
//console.log(select(source, '.type:val("Literal")').nodes().length);
//console.log(select(source, '.type:val("ForStatement")').nodes().length);

//console.log(select(source, ':root :has(:has(.type:val("ExpressionStatement")) > .expression > .callee > .name:val("define"))').nodes());

var selector = ':root object:has(object:has(:root > .type:val("ExpressionStatement")) > .expression .type:val("CallExpression") ~ .callee > .name:val("define"))';
var selection = select(tree, selector).nodes();

console.log(selector);
console.log(selection);
console.log(selection.length);