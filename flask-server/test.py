from server import grade
import os
import ezdxf
from filediff.diff import file_diff_compare
import filecmp
import shutil
cur_path = os.getcwd() + "/test/"

def singleTest(correct_file, test_file, accuracyThreshold, extraEntities, hatchError, 
          coloringError, lineweightError, verbose, scalingError, rotationError):

    result, mistakes = grade(test_file, correct_file, verbose, accuracyThreshold, extraEntities,
    hatchError, coloringError, lineweightError, scalingError, rotationError)
    return result, mistakes

def compareResult(result_path):
    dir = cur_path + result_path
    result_list = os.listdir(dir)
    for i in range(len(result_list)):
        for j in range(i+1, len(result_list)):
            file1_path = dir+result_list[i]
            file2_path = dir+result_list[j]
            if not filecmp.cmp(file1_path, file2_path, shallow=False):
                os.makedirs(dir + "error/", exist_ok=True)
                file = open(dir + "error/Error_Report.txt", mode='a')
                file.write(result_list[i]+"    "+result_list[j])
                file_diff_compare(file1_path, file2_path, dir + "error/" + result_list[i]+"_"+result_list[j]+".html", 65535, 0, True, True)

def readFile(path) -> dict:
    dir = cur_path + path
    filename_list = os.listdir(dir)
    file_dict = {filename:ezdxf.readfile(dir + "/" + filename) 
                 for filename in filename_list if filename.__contains__(".dxf")}
    return file_dict

def saveFile(file, score, mistakes):
    file = open(file, mode='w')
    content = "score: " + str(score) + "\n\n" + "mistakes: \n" + mistakes
    file.write(content)
    file.close()

def formatMistake(mistakes):
    res = ""
    for item in mistakes:
        res += str(item) + "\n"
    return res

def versionTest(result_path, correct_path, test_path, accuracyThreshold, extraEntities, hatchError, 
          coloringError, lineweightError, verbose, scalingError, rotationError):
    correct_dict = readFile(correct_path)
    test_dict = readFile(test_path)
    shutil.rmtree(cur_path + result_path)

    for correct in correct_dict:
        for test in test_dict:
            result, mistakes = singleTest(test_dict[test], correct_dict[correct], accuracyThreshold, extraEntities, hatchError, 
                        coloringError, lineweightError, verbose, scalingError, rotationError)
            mistake_str = formatMistake(mistakes)
            os.makedirs(cur_path + result_path, exist_ok=True)
            saveFile(cur_path + result_path + correct + "_"+ test + ".txt", result, mistake_str)
    
    compareResult(result_path)
            

versionTest( "test1/result/", "test1/correct/", "test1/test/", 1, 5, 5, 5, 5, 0, 5, 5)
