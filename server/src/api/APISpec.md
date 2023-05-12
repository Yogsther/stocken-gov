# Concept model
### tax report
A report containing the taxable income, tax amount and deductions of a player during a tax period. A report has the following format:
```
{
    _id: any
    player_guid: string
    income: Map<string, number>
    tax: Map<string, number>
    deductions: Map<string, number>
    valid_until: number
    due: number
    signed: boolean
}
```

### signable report
A report that can be signed.

### currrent report
A signable report from the last tax period. A current report is subject to change. There can only be one current report at at time. There can be no current report as well.
### preliminary report
An unsignable tax report from the current tax period. A preliminary report is subject to change. There can only be one preliminary report at at time.

### due report
A signable tax report that which the due date has been passed. There can be several due reports at a time.

# stocken.gov client API (draft #1)

## General info:
Responses with successful status codes (2XX) will always respond with JSON as its body. Responses with unsucessful status codes (4XX) will always respond with an error message that is meant to be displayed to the user as its body, only text.
## noAuth
### **GET**:  api/test?guid=[guid]
For testing if the API works.
#### Response body:
```
[guid]
```
### **POST**: api/login
Used for retrieving a token that will be used for authentication in other API calls.
#### Request body:
```json
{
    username: string
    password: string
}
```
Responds with a valid token as a cookie.

## reports
### **GET**: api/reports/preliminary?guid=[guid]
Gets the preliminary tax report for a given player (unsignable).
#### Response body:
```
{ITaxReport}
```

### **GET**: api/reports/due?guid=[guid]
Gets all due tax reports for a given player.
#### Response body:
```
[{ITaxReport}]
```

### **GET**: api/reports/current?guid=[guid]
Gets the current tax report (signable). Responds with a message if no current report is present.
#### Response body:
```
{ITaxReport} | {message: string}
```
### **GET**: api/reports/signable?guid=[guid]
Gets all signable tax reports for a given player. This includes the current report and all due reports.
#### Response body:
```
[{ITaxReport}]
```
### **PUT**: api/reports/sign?reportId=[reportId]
Signs the tax report with given id.
#### Response body:
```
{message: string}
```
### **PUT**: api/reports/deduct?reportId=[reportId]
Updates the deductions list in a given tax report. If the report is signed, the deductions will not be updated.
#### Response body:
```
{message: string}
```