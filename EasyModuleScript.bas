Attribute VB_Name = "Module1"
Sub stock_no_ws()
' Set an initial variable for the ticker and the volume
Dim Ticker As String
Dim TotalVol As Double
TotalVol = 0
'Added the two lines below'
Range("I1").Value = "Ticker"
Range("J1").Value = "Total Stock Volume"

LastRow = Cells(Rows.Count, 1).End(xlUp).Row

' Keep track of the location for where the ticker and volume tables are
Dim Summary_Table_Row As Integer
Summary_Table_Row = 2

' Loop through all the data
For I = 2 To LastRow

  ' Check if the ticker is the same, then add together, if it is not...
  If Cells(I + 1, 1).Value <> Cells(I, 1).Value Then

    ' Set the ticker name
    Ticker = Cells(I, 1).Value

    ' Add to the Volume Total
    TotalVol = TotalVol + Cells(I, 7).Value

    ' Print the Ticker values in the Summary Table
    Range("I" & Summary_Table_Row).Value = Ticker

    ' Print the Total Volume to the Summary Table
    Range("J" & Summary_Table_Row).Value = TotalVol

    ' Add the next ticker to another row
    Summary_Table_Row = Summary_Table_Row + 1

    ' Reset the Total Volume in the next row to reiterate
    TotalVol = 0

  ' If the cell immediately following a row is the same brand...
  Else

    ' Add to the Total Volume
    TotalVol = TotalVol + Cells(I, 7).Value
  End If
Next I
End Sub
