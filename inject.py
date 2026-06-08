path_quiz = r'D:\abdo_portfolio\main\templates\main\quiz.html'
path_db = r'D:\abdo_portfolio\main\static\main\js\quiz_db.js'

db_content = open(path_db, encoding='utf-8').read()
quiz_content = open(path_quiz, encoding='utf-8').read()

quiz_content = quiz_content.replace('<script src="js/quiz_db.js"></script>', '<script>\n' + db_content)

open(path_quiz, 'w', encoding='utf-8').write(quiz_content)
print('Injected quiz_db.js into quiz.html directly.')
