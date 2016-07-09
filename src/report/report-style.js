const STYLE =
`* {
    font-family: Verdana;
}
body {
    margin: 5px;
}
h1 {
    font-size: 20px;
}
.metric-row {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.metric {
    margin: 10px;
    width: 260px;
    height: 100px;
    position: relative;
    border: 1px solid #000000;
}
.metric-icon {
    position: absolute;
    top: 5px;
    right: 5px;
}
.metric-title {
    font-size: 20px;
    text-align: center;
    line-height: 30px;
}
.metric-title a {
    font-size: 20px;
}
.metric-title span {
    font-size: 20px;
    color: inherit;
}
.metric-value {
    font-size: 40px;
    text-align: center;
    line-height: 60px;
    margin-left: 10px;
}
table {
    border-collapse: collapse;
    margin:0px;
    padding:0px;
}
table td{
	border:1px solid #000000;
	padding:7px;
	font-weight:normal;
}
table thead td{
	font-weight:bold;
}
a {
    color: inherit;
}
a:hover {
    cursor: pointer;
    text-decoration: underline;
}
`;

module.exports = STYLE;
