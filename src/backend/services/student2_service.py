from repositories.student_repository import StudentRepository
import requests

class StudentService2:
    BASE_URL = "http://127.0.0.1:5001/tables"

    @staticmethod
    def get_all_students():
        # Charger toutes les données en une seule fois
        data = {
            "students": requests.get(f"{StudentService2.BASE_URL}/student").json()['student'],
            "academic_info": requests.get(f"{StudentService2.BASE_URL}/academic_info").json()['academic_info'],
            "academic_perf": requests.get(f"{StudentService2.BASE_URL}/academic_perf").json()['academic_perf'],
            "families": requests.get(f"{StudentService2.BASE_URL}/family").json()['family'],
            "hobbies": requests.get(f"{StudentService2.BASE_URL}/hobby").json()['hobby'],
            "hobby_times": requests.get(f"{StudentService2.BASE_URL}/hobby_time_dict").json()['hobby_time_dict'],
            "vg": requests.get(f"{StudentService2.BASE_URL}/vg").json()['vg'],
            "weekdays_vg_times": requests.get(f"{StudentService2.BASE_URL}/weekdays_vg_time_dict").json()['weekdays_vg_time_dict'],
            "weekend_vg_times": requests.get(f"{StudentService2.BASE_URL}/weekend_vg_time_dict").json()['weekend_vg_time_dict'],
            "parent_schooling": requests.get(f"{StudentService2.BASE_URL}/parent_schooling_dict").json()['parent_schooling_dict'],
            "grade": requests.get(f"{StudentService2.BASE_URL}/grade_dict").json()['grade_dict'],
            "further_study_level": requests.get(f"{StudentService2.BASE_URL}/further_study_level_dict").json()['further_study_level_dict']
        }

        # Indexer les données pour des recherches rapides
        academic_info_dict = {ai["academic_info_id"]: ai for ai in data["academic_info"]}
        further_study_level_dict = {ai["further_study_level_id"]: ai for ai in data["further_study_level"]}
        family_dict = {f["family_id"]: f for f in data["families"]}
        hobby_dict = {h["hobby_id"]: h for h in data["hobbies"]}
        hobby_time_dict = {ht["hobby_time_id"]: ht for ht in data["hobby_times"]}
        academic_perf_dict = {ap["academic_perf_id"]: ap for ap in data["academic_perf"]}
        grade_dict = {ht["grade_id"]: ht for ht in data["grade"]}
        vg_dict = {v["vg_id"]: v for v in data["vg"]}
        weekdays_vg_time_dict = {vt["weekdays_vg_time_id"]: vt for vt in data["weekdays_vg_times"]}
        weekend_vg_time_dict = {vt["weekend_vg_time_id"]: vt for vt in data["weekend_vg_times"]}
        parent_schooling_dict = {ps["parent_schooling_id"]: ps["parent_schooling"] for ps in data["parent_schooling"]}

        result = []
        for student in data["students"]:
            academic_perf = academic_perf_dict.get(student["academic_perf_id"], {})
            academic_info = academic_info_dict.get(student["academic_info_id"], {})
            family = family_dict.get(student["family_id"], {})
            
            # Récupération des informations sur les études futures
            further_study = academic_info_dict.get(student["academic_info_id"], {})
            further_study_selected = further_study_level_dict.get(further_study["further_study_level_id"], {})

            # Récupération des informations sur les notes
            grade = academic_perf_dict.get(student["academic_perf_id"], {})
            avg_grade = grade_dict.get(grade.get("avg_grade"), {})
            english_grade = grade_dict.get(grade.get("english_avg_grade"), {})

            # Récupération des informations sur les loisirs
            hobby = hobby_dict.get(student["hobby_id"], {})
            weekdays_hobby_time = hobby_time_dict.get(hobby.get("weekdays_hobby_time_id"), {})
            weekend_hobby_time = hobby_time_dict.get(hobby.get("weekend_hobby_time_id"), {})
            weekdays_chores_time = hobby_time_dict.get(hobby.get("weekdays_chores_time_id"), {})
            weekend_chores_time = hobby_time_dict.get(hobby.get("weekend_chores_time_id"), {})
            social_media_time = hobby_time_dict.get(hobby.get("SM_time_id"), {})

            # Récupération des informations sur les jeux vidéo
            vg = vg_dict.get(student["vg_id"], {})
            weekdays_vg_time = weekdays_vg_time_dict.get(vg.get("weekdays_VG_time_id"), {})
            weekend_vg_time = weekend_vg_time_dict.get(vg.get("weekend_VG_time_id"), {})

            # Construction de l'objet final
            result.append({
                "schoolingLevel": parent_schooling_dict.get(family.get("parent1_schooling_level_id"), ""),
                "hobbyTimeSm": weekdays_hobby_time.get("hobby_time"),
                "hobbyTimeWe": weekend_hobby_time.get("hobby_time"),
                "vgTimeSm": weekdays_vg_time.get("weekdays_vg_time"),
                "vgTimeWe": weekend_vg_time.get("weekend_vg_time"),
                "chordsTimeSm": weekdays_chores_time.get("hobby_time"),
                "chordsTimeWe": weekend_chores_time.get("hobby_time"),
                "socialMediaTime": social_media_time.get("hobby_time"),
                "avg_grade": avg_grade.get("grade"),
                "english_grade": english_grade.get("grade", 0),
                "target_education": further_study_selected.get("further_study_level"),
                "Medu": parent_schooling_dict.get(family.get("parent1_schooling_level_id"), ""),
                "Fedu": parent_schooling_dict.get(family.get("parent2_schooling_level_id"), ""),
            })

        return result
