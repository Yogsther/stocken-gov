call mvn clean
call mvn package
xcopy /y /q .\target\taxauth-1.jar ..\mc-test-server\plugins\taxauth-1.jar