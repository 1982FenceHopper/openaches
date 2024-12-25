import pandas as pd
import io

def fold_data(data: any, tags: any) -> any:
    df = pd.read_csv(io.StringIO(data), header=[0, 1])
    
    hxl_tags = df.columns.get_level_values(1)
    mask = hxl_tags.str.startswith(tuple(tags))
    
    f_df = df.loc[:, mask]
    f_df.columns = f_df.columns.get_level_values(0)
    f_df = f_df.reset_index(drop=True)
    
    return f_df.to_csv(index=False)