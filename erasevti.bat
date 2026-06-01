@echo off
cd .git
for /d /r %%F in (_vti_cnf) do (
    echo Deleting: %%F
    rd /s /q "%%F"
)
cd ..
"C:\Program Files\Git\cmd\git-gui.exe"