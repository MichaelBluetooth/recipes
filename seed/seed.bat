SET API_ROOT="http://localhost:8080/api/unitsofmeasure/bulk"

"C:\Program Files\Git\mingw64\bin\curl.exe" -d "@unitsofmeasure.json" -H "Content-Type: application/json" -X POST %API_ROOT%
 