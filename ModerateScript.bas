Attribute VB_Name = "Module2"
' Steps:
' ----------------------------------------------------------------------------

' Part I:

' 1. Define your variables
' 2. Create the Output sheet and add the Ticker, Yearly Change, Percent Change and Total Stock Volume columns
' 3. Create a loop to gather data through the worksheets
' 4. Yearly change from what the stock opened the year at to what the closing price. Then do percent
' 5. The total Volume of the stock
' 6. Ticker Symbol
' 7. You should also have conditional formatting that will highlight positive change in green and negative change in red.

Sub ModerateAssignment()
' --------------------------------------------
' DEFINE YOUR VARIABLES AND ADD COULUMNS TO FIRST SHEET
' --------------------------------------------
Dim volumeforA As Variant
   volumeforA = 0
   
Dim output_row As Variant
Dim Ticker As Long
Dim TotalVol As Long
Dim YearlyChange As Integer
Dim YearPercent As Double

ActiveWorkbook.Sheets.Add Before:=Worksheets(Worksheets.Count)
ActiveSheet.Name = "Output"

Dim Results As Worksheet
Set Results = Worksheets("Output")

'For NewColumns in 'Worksheet("Output"):

Range("A1").Value = "Ticker"
Range("B1").Value = "Yearly Change"
Range("C1").Value = "Percentage"
Range("D1").Value = "Total Stock Volume"

   ' --------------------------------------------
   ' LOOP THROUGH ALL SHEETS
   ' --------------------------------------------
   For Each WS In Worksheets
            ' Determine the Last Row
                LastRow = WS.Cells(Rows.Count, 1).End(xlUp).Row
            ' Determine the Last Column Number
                LastColumn = WS.Cells(1, Columns.Count).End(xlToLeft).Column
                'MsgBox (LastRow)
                'MsgBox (LastColumn)
       
       If WS.Name <> "Output" Then
       
        For i = 2 To LastRow
        ' Check if the ticker is the same, then add together, if it is not...
            If Cells(i + 1, 1).Value <> Cells(i, 1).Value Then
            
            Results.Cells(i, 1).Value = Ticker
            TotalVol = TotalVol + Cells(i, 7).Value
            YearlyChange = Cells(i, 6) - Cells(i, 3)
            YearPercent = (YearlyChange / Cells(i, 6)) * 100

            ' Print the Ticker values in the Output
            Output.Cells(i + 1, 1).Value = Ticker
        
            ' Print the Total Volume to the Output
            Output.Cells(i + 1, 4).Value = TotalVol
            
            ' Print the Ticker values in the Output
            Output.Cells(i + 1, 2).Value = YearlyChange
        
            ' Print the Total Volume to the Summary Table
            Output.Cells(i + 1, 3).Value = YearPercent
            
            
            End If
        
        Next i
        End If
    Next
End Sub
