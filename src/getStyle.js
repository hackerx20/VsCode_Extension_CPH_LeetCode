function getHomePageStyle(){
    return `
    body {
        background-color: #121212;
        color: #e0e0e0;
        font-family: 'Cascadia Code', 'Fira Code', monospace;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        padding: 20px;
        box-sizing: border-box;
    }

    .container {
        background-color: #1e1e1e;
        border-radius: 15px;
        padding: 30px;
        box-shadow: 0 15px 30px rgba(0,0,0,0.4);
        max-width: 500px;
        width: 100%;
        transition: all 0.4s ease;
    }

    .container:hover {
        transform: scale(1.02);
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }

    h2 {
        color: #4CAF50;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 20px;
        text-align: center;
    }

    hr {
        border-color: #2196F3 !important;
        opacity: 0.7 !important;
        margin-bottom: 30px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-control {
        background-color: #2c2c2c;
        border: 2px solid #3c3c3c;
        color: #e0e0e0;
        transition: all 0.4s ease;
        font-family: 'Cascadia Code', monospace;
    }

    .form-control:focus {
        background-color: #333;
        border-color: #4CAF50;
        box-shadow: 0 0 15px rgba(76, 175, 80, 0.2);
        color: #4CAF50;
    }

    .form-control::placeholder {
        color: #666;
        opacity: 0.7;
    }

    label {
        color: #2196F3;
        font-weight: bold;
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .btn-primary {
        background-color: #4CAF50;
        border-color: #4CAF50;
        font-family: 'Cascadia Code', monospace;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s ease;
        width: 100%;
    }

    .btn-primary:hover {
        background-color: #45a049;
        border-color: #45a049;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
    }

    /* Smooth Animations */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .container {
        animation: fadeIn 0.6s ease-out;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #3c3c3c;
    }

    ::-webkit-scrollbar-thumb {
        background-color: (#4CAF50);
        border-radius: 4px;
    }`
}

function getDescriptionPageStyle(){
    return `
        body {
            background-color: #121212;
            color: #e0e0e0;
            font-family: 'Cascadia Code', 'Fira Code', monospace;
        }

        /* Card Styling */
        .card {
            background-color: #1e1e1e;
            border: 2px solid #333;
            box-shadow: 0 15px 30px rgba(0,0,0,0.4);
            border-radius: 15px;
            overflow: hidden;
        }

        /* Accordion Styling */
        .accordion-button {
            background-color: #2c2c2c;
            color: #e0e0e0;
            font-family: 'Cascadia Code', 'Fira Code', monospace;
            transition: all 0.4s ease;
            border-bottom: 1px solid #333;
        }

        .accordion-button:not(.collapsed) {
            background-color: #3c3c3c;
            color: #4CAF50;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .accordion-button:focus {
            box-shadow: none;
            outline: none;
        }

        .accordion-item {
            background-color: #1e1e1e;
            border: none;
            margin-bottom: 15px;
            border-radius: 12px;
            overflow: hidden;
        }

        /* Result Container Styling */
        .result-container {
            display: flex;
            gap: 30px;
            width: 100%;
            max-width: 1200px;
        }

        .result-box {
            flex: 1;
            background-color: #1e1e1e;
            border-radius: 12px;
            box-shadow: 0 8px 15px rgba(0,0,0,0.3);
            padding: 25px;
            border: 2px solid transparent;
            transition: all 0.4s ease;
        }

        .result-box:hover {
            transform: scale(1.02);
            box-shadow: 0 10px 20px rgba(0,0,0,0.4);
        }

        .result-title {
            font-weight: bold;
            margin-bottom: 20px;
            color: #fff;
            font-size: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: 'Cascadia Code', 'Fira Code', monospace;
        }

        .result-content-actual {
            background-color: #2c2c2c;
            border-radius: 8px;
            padding: 15px;
            font-family: 'Cascadia Code', monospace;
            white-space: pre-wrap;
            max-height: 300px;
            overflow-y: auto;
            color: #4CAF50;
            line-height: 1.6;
            border: 1px solid #3c3c3c;
        }

        .result-content-expected {
            background-color: #2c2c2c;
            border-radius: 8px;
            padding: 15px;
            font-family: 'Cascadia Code', monospace;
            white-space: pre-wrap;
            max-height: 300px;
            overflow-y: auto;
            color: #4CAF50;
            line-height: 1.6;
            border: 1px solid #3c3c3c;
        }
        /* Status Indicator Styling */
        .status-indicator {
            display: flex;
            align-items: center;
            margin-top: 20px;
            justify-content: flex-end;
        }

        .status-icon {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin-right: 10px;
            animation: pulse 1.5s infinite;
        }
        .pass-border{
            border-color: #4CAF50;
        }
        .fail-border{
            border-color: #F44336;
        }

        .pass {
            background-color: #4CAF50;
        }

        .fail {
            background-color: #F44336;
        }

        .status-text {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 0.8em;
            font-family: 'Cascadia Code', 'Fira Code', monospace;
        }

        /* Scrollbar Styling */
        .result-content::-webkit-scrollbar {
            width: 8px;
        }

        .result-content::-webkit-scrollbar-track {
            background: #3c3c3c;
        }

        .result-content::-webkit-scrollbar-thumb {
            background-color: #4CAF50;
            border-radius: 4px;
        }

        .form-control.result-box {
            background-color: #2c2c2c;
            color: #4CAF50;
            font-family: 'Cascadia Code', monospace;
            border: 2px solid #3c3c3c;
            border-radius: 12px;
            padding: 15px;
            line-height: 1.6;
            transition: all 0.4s ease;
            resize: vertical;
            min-height: 150px;
            max-height: 400px;
        }

        .form-control.result-box:focus {
            background-color: #333;
            border-color: #4CAF50;
            box-shadow: 0 0 15px rgba(76, 175, 80, 0.2);
            outline: none;
        }

        .form-control.result-box:hover {
            border-color: #4CAF50;
            transform: scale(1.01);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .form-control.result-box::-webkit-scrollbar {
            width: 8px;
        }

        .form-control.result-box::-webkit-scrollbar-track {
            background: #3c3c3c;
            border-radius: 4px;
        }

        .form-control.result-box::-webkit-scrollbar-thumb {
            background-color: #4CAF50;
            border-radius: 4px;
        }

        .form-control.result-box::placeholder {
            color: #666;
            font-family: 'Cascadia Code', monospace;
            opacity: 0.7;
        }
        .btn{
            margin: 10px;
        }
        .btn-success {
            background-color: #4CAF50;
            border-color: #4CAF50;
            font-family: 'Cascadia Code', 'Fira Code', monospace;
            transition: all 0.3s ease;
        }

        .btn-success:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
        }

        .btn-danger {
            background-color: #F44336;
            border-color: #F44336;
            font-family: 'Cascadia Code', 'Fira Code', monospace;
            transition: all 0.3s ease;
        }

        .btn-danger:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(244, 67, 54, 0.4);
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 0.7;
            }
            50% {
                transform: scale(1.1);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 0.7;
            }
        }

        @keyframes glow {
            0% {
                box-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
            }
            50% {
                box-shadow: 0 0 15px rgba(76, 175, 80, 0.4);
            }
            100% {
                box-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
            }
        }

        .form-control.result-box:focus {
            animation: glow 2s infinite;
        }
    `
}
function getInstructionPageStyle(){
    return `
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    background-color: #0a0a23;
    color: #f0f0f0;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

/* Container Styling */
.container {
    background-color: #1b1b32;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

/* Headings */
h1 {
    color: #4CAF50;
    text-align: center;
    border-bottom: 2px solid #4CAF50;
    padding-bottom: 10px;
}

h2 { 
    color: #4CAF50; 
    text-transform: uppercase; 
    letter-spacing: 2px; 
    margin-bottom: 20px; 
    text-align: center; 
}

/* Horizontal Rule */
hr { 
    border-color: #2196F3 !important; 
    opacity: 0.7 !important; 
    margin-bottom: 30px; 
}

/* Form Group */
.form-group { 
    margin-bottom: 20px; 
}

/* Form Control */
.form-control { 
    background-color: #2c2c2c; 
    border: 2px solid #3c3c3c; 
    color: #e0e0e0; 
    transition: all 0.4s ease; 
    font-family: 'Cascadia Code', monospace; 
}

.form-control:focus { 
    background-color: #333; 
    border-color: #4CAF50; 
    box-shadow: 0 0 15px rgba(76, 175, 80, 0.2); 
    color: #4CAF50; 
}

.form-control::placeholder { 
    color: #666; 
    opacity: 0.7; 
}

/* Labels */
label { 
    color: #2196F3; 
    font-weight: bold; 
    margin-bottom: 10px; 
    text-transform: uppercase; 
    letter-spacing: 1px; 
}

/* Primary Button */
.btn-primary { 
    background-color: #4CAF50; 
    border-color: #4CAF50; 
    font-family: 'Cascadia Code', monospace; 
    text-transform: uppercase; 
    letter-spacing: 1px; 
    transition: all 0.3s ease; 
    width: 100%; 
}

.btn-primary:hover { 
    background-color: #45a049; 
    border-color: #45a049; 
    transform: translateY(-3px); 
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4); 
}

/* Step Sections */
.step {
    background-color: #2c2c4c;
    border-left: 4px solid #4CAF50;
    padding: 15px;
    margin: 20px 0;
    border-radius: 0 5px 5px 0;
}

.step-number {
    color: #4CAF50;
    font-weight: bold;
    margin-right: 10px;
}

/* Warning Section */
.warning {
    background-color: #3a3a5a;
    border-left: 4px solid #FF6B6B;
    padding: 15px;
    margin: 20px 0;
    border-radius: 0 5px 5px 0;
}

/* Code Highlighting */
code {
    background-color: #2c2c4c;
    color: #4CAF50;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
}

/* Login Form Container */
.login-form {
    background-color: #2c2c4c;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
}

/* Animations */
@keyframes fadeIn { 
    from { 
        opacity: 0; 
        transform: translateY(20px); 
    } 
    to { 
        opacity: 1; 
        transform: translateY(0); 
    } 
}

.container { 
    animation: fadeIn 0.6s ease-out; 
}

/* Custom Scrollbar */
::-webkit-scrollbar { 
    width: 8px; 
}

::-webkit-scrollbar-track { 
    background: #3c3c3c; 
}

::-webkit-scrollbar-thumb { 
    background-color: #4CAF50; 
    border-radius: 4px; 
}`
}


module.exports = {getHomePageStyle, getInstructionPageStyle,getDescriptionPageStyle};


